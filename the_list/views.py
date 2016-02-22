from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from the_list.models import ListEntry
from django.views.decorators.cache import never_cache
import random


def algorithim(search_term):
    entry, created = ListEntry.objects.get_or_create(entry=search_term)
    if not created:
        return entry
    random.seed()
    THE_DECIDER = random.randint(0, 100)
    if (THE_DECIDER > 75):
        entry.active = True
        entry.save()
    return entry


def the_list(request, page=1):
    the_list = ListEntry.objects.filter(active=True)
    paginator = Paginator(the_list, 10)
    try:
        current_list = paginator.page(page)
    except PageNotAnInteger:
        current_list = paginator.page(1)
    except EmptyPage:
        current_list = paginator.page(paginator.num_pages)
    offset = (current_list.number - 1) * 10
    return render(request, "the_list.html",
                  {"current_list": current_list, "offset": offset})


@never_cache
def is_it_on_the_list(request):
    context = {}
    if request.POST:
        query = request.POST.get("query", "").strip().lower()
        if not query:
            return render(request, "on_the_list.html")
        result = algorithim(query)
        context = {"result": result}
    return render(request, "on_the_list.html", context)
