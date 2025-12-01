# 💾 پشتیبان و بازیابی

## Automated Backup

### Cron Job
```bash
# daily-backup.sh
#!/bin/bash
BACKUP_FILE="backup-$(date +%Y%m%d).sql"
pg_dump $DATABASE_URL > $BACKUP_FILE
gzip $BACKUP_FILE
aws s3 cp $BACKUP_FILE.gz s3://backups/
```

### Schedule
```
0 2 * * * /path/to/daily-backup.sh
```

## Manual Backup

```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Gzip
gzip backup.sql

# Upload to S3
aws s3 cp backup.sql.gz s3://bucket/backups/
```

## Restore

### From SQL File
```bash
psql -d database < backup.sql
```

### From Gzip
```bash
gunzip backup.sql.gz
psql -d database < backup.sql
```

### Point-in-Time Recovery (PITR)
```
1. شروع WAL archiving
2. Backup کامل دیتابیس
3. WAL logs محفوظ کنید
4. Restore + Replay WALs
```

## Verification

```bash
# بررسی backup
pg_dump --schema-only backup.sql | wc -l

# فهرست جداول
pg_dump -l backup.sql
```

---

**محدثه:** 1 دسامبر 2025
