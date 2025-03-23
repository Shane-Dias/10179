from django.shortcuts import render
from .models import Todo
from datetime import datetime

def index(request):
    #return HttpResponse("This is my homepage")
    if request.method=='POST':
        tsk = request.POST.get("task")
        desc = request.POST.get("desc")
        todo = Todo(task=tsk,desc=desc,date=datetime.today())
        todo.save()
    return render(request,"index.html")

# Create your views here.
