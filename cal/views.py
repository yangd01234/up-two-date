from django.shortcuts import render


c_save_test = [
    {
        'username': 'test@gmail.com',
        'save_name': 'test save 1',
        'save_color': 'test save color code',
        'start_time': 'test start time',
        'end_time': 'test end time'
    },
    {
         'username': 'test@gmail.com',
        'save_name': 'test save 2',
        'save_color': 'test save 2 color code',
        'start_time': 'test start 2 time',
        'end_time': 'test end 2 time'       
    }
]
# homepage
def home(request):
    context = {
        'c_save':c_save_test
    }
    return render(request, 'cal/home.html', context)

# about
def about(request):
    return render(request, 'cal/about.html', {'title': 'About'})
