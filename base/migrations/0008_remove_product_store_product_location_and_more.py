# Generated by Django 4.2.1 on 2023-06-15 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_product_store_alter_store_location_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='store',
        ),
        migrations.AddField(
            model_name='product',
            name='location',
            field=models.ManyToManyField(related_name='products', to='base.location'),
        ),
        migrations.AlterField(
            model_name='product',
            name='end_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='start_date',
            field=models.DateField(null=True),
        ),
    ]
