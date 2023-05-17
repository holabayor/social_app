from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from .models import LoginForm


# Create your views here.
def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request, username=cd.get('username'), password=cd.get('password'))
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse('Authentication successfully')
                else:
                    return HttpResponse('Disabled account')
            else:
                return HttpResponse('Invalid username or password')
    else:
        form = LoginForm()
    return render(request, 'account/login.html', {'form': form})