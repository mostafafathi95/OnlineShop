import type { Express } from "express";
import { storage } from "../storage";
import { requireAuth } from "./middleware";

// =============================================================================
// MOCK PAYMENT GATEWAY VERIFICATION
// In a real application, this function would make a server-to-server API call
// to the payment gateway (e.g., Zarinpal, Mellat) to verify the transaction.
// It should NEVER trust data coming from the client's browser (URL query params).
// =============================================================================
async function verifyTransactionWithGateway(
  authority: string,
  amount: number
): Promise<{ success: boolean; message: string }> {
  console.log(
    `[MOCK] Verifying transaction with authority: ${authority} for amount: ${amount}`
  );

  // Simulate API call to the gateway.
  // In a real scenario, you would use a library like 'axios' or 'fetch' here.
  // const response = await axios.post('https://api.paymentgateway.com/v1/verify', {
  //   merchant_id: process.env.PAYMENT_GATEWAY_MERCHANT_ID,
  //   authority: authority,
  //   amount: amount,
  // });

  // For this mock, we'll assume the verification is successful if the authority is not empty.
  if (authority && authority.length > 5) {
    // if (response.data.code === 100) { // Real world check
    return { success: true, message: "Transaction verified successfully." };
  } else {
    return { success: false, message: "Invalid transaction authority." };
  }
}

export async function registerPaymentRoutes(app: Express): Promise<void> {
  // This endpoint simulates redirecting the user to the payment gateway.
  app.get("/api/payment/initiate", requireAuth, async (req, res) => {
    try {
      const { orderId, gateway } = req.query;
      if (!orderId || !gateway) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      const order = await storage.getOrderById(parseInt(orderId as string));
      if (!order || order.userId !== (req as any).userId) {
        return res.status(404).json({ error: "Order not found" });
      }

      // In a real application, you would make a request to the gateway here
      // to get a payment URL and a unique transaction authority.
      const mockAuthority = `mock_authority_${Date.now()}`;

      // We save the authority with the order to verify it later.
      await storage.updateOrder(order.id, {
        paymentGateway: gateway as string,
        paymentAuthority: mockAuthority
      });

      // Redirect the user to the gateway's callback on our site.
      res.redirect(
        `/api/payment/callback?orderId=${orderId}&authority=${mockAuthority}&status=success`
      );
    } catch (error) {
      console.error("Payment initiation failed:", error);
      res.status(500).json({ error: "Payment initiation failed" });
    }
  });

  // The ONLY secure place to verify a payment is the callback endpoint.
  app.get("/api/payment/callback", async (req, res) => {
    try {
      const { orderId, authority } = req.query;

      if (!orderId || !authority) {
        return res.redirect(`/checkout?payment=failed&reason=invalid_params`);
      }

      const order = await storage.getOrderById(parseInt(orderId as string));

      // 1. Check if the order exists and hasn't been paid for already.
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      if (order.paymentStatus === "completed") {
        // Already paid, prevent replay attacks.
        return res.redirect(`/account/orders/${orderId}?payment=already_verified`);
      }

      // 2. The client-side 'status' is IRRELEVANT. We only trust the server-to-server verification.
      // We also check if the authority matches the one we saved.
      if (order.paymentAuthority !== authority) {
          return res.redirect(`/checkout?payment=failed&reason=authority_mismatch`);
      }

      // 3. Server-to-Server Verification
      // We use the amount stored on OUR server, not from the client.
      const verificationResult = await verifyTransactionWithGateway(
        authority as string,
        parseFloat(order.total) // Corrected from totalAmount to total and ensuring it's a number
      );

      if (verificationResult.success) {
        // 4. Verification successful: Update order status to completed.
        await storage.updateOrder(parseInt(orderId as string), {
          paymentStatus: "completed",
          status: "processing", // Move order to processing
        });
        res.redirect(`/account/orders/${orderId}?payment=success`);
      } else {
        // 5. Verification failed: Update order status to failed.
        await storage.updateOrder(parseInt(orderId as string), {
          paymentStatus: "failed",
        });
        res.redirect(`/checkout?payment=failed&reason=${verificationResult.message}`);
      }
    } catch (error) {
      console.error("Payment callback failed:", error);
      res.status(500).json({ error: "Payment callback failed" });
    }
  });

  // The '/api/payment/success' endpoint has been REMOVED.
  // It is insecure because it blindly trusts the client. All verification logic
  // is now consolidated in the '/api/payment/callback' endpoint.
}
