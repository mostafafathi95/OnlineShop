import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, MapPin, Plus, Trash2, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Address } from "@shared/schema";
import { useAddressForm, useAddresses, parseAddressForEdit } from "./hooks";
import { useCreateAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation, useSetDefaultAddressMutation } from "./mutations";
import { AddressForm } from "./AddressForm";

export default function Addresses() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { data: addresses, isLoading } = useAddresses(isAuthenticated);
  const { formData, setFormData, resetForm } = useAddressForm();

  const createMutation = useCreateAddressMutation();
  const updateMutation = useUpdateAddressMutation();
  const deleteMutation = useDeleteAddressMutation();
  const setDefaultMutation = useSetDefaultAddressMutation();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "نیاز به ورود",
        variant: "destructive",
      });
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated, toast]);

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData(parseAddressForEdit(address));
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.fullName || !formData.phone || !formData.address) {
      toast({
        title: "اطلاعات ناقص",
        description: "لطفا همه فیلدهای الزامی را پر کنید.",
        variant: "destructive",
      });
      return;
    }

    if (editingAddress) {
      updateMutation.mutate({ id: editingAddress.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">آدرس‌های من</h1>
              <p className="text-muted-foreground">مدیریت آدرس‌های تحویل</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingAddress(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                افزودن آدرس
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingAddress ? "ویرایش آدرس" : "افزودن آدرس جدید"}
                </DialogTitle>
                <DialogDescription>
                  {editingAddress ? "اطلاعات آدرس را ویرایش کنید" : "یک آدرس تحویل جدید اضافه کنید"}
                </DialogDescription>
              </DialogHeader>
              <AddressForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={createMutation.isPending || updateMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        ) : addresses && addresses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Card key={address.id} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{address.title}</span>
                      {address.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          پیش‌فرض
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {!address.isDefault && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDefaultMutation.mutate(address.id)}
                          title="تنظیم به عنوان پیش‌فرض"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(address)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>حذف آدرس</AlertDialogTitle>
                            <AlertDialogDescription>
                              آیا از حذف این آدرس اطمینان دارید؟ این عمل قابل بازگشت نیست.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>انصراف</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(address.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <p className="text-sm">
                    {address.fullName} - {address.phone}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {address.province}، {address.city}، {address.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    کد پستی: {address.postalCode}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">آدرسی ثبت نشده است</h2>
              <p className="text-muted-foreground mb-6">
                برای ثبت سفارش، ابتدا آدرس تحویل خود را اضافه کنید.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="ml-2 h-4 w-4" />
                افزودن آدرس
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
