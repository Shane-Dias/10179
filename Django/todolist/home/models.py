from django.db import models

class Todo(models.Model):
    sno = models.IntegerField(default=0)
    date = models.DateTimeField()
    task = models.CharField(max_length=200,null=False)
    desc = models.CharField(max_length=200,null=False)

    def __str__(self):
        return f"{self.sno}:{self.task}"
# Create your models here.
