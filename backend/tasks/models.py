from django.db import models


class Task(models.Model):
    STATUS_CHOICES = [
        ('N', 'New'),
        ('P', 'In Progress'),
        ('D', 'Done')
    ]
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200, blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='N')

    def __str__(self):
        return self.title
