from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.http import HttpResponse

from blog.models import Category
from blog.models import Post
from blog.models import Tag
from blog.models import Readit
from blog.models import Vote


def writing(request):
    parent_cats = Category.objects.filter(
        visible=True, parent=None)
    posts = {}
    for cat in parent_cats:
        posts[cat] = cat.post_set.filter(published=True).order_by("id")[:3]
    context = {
        "posts": posts,
        "parent_cats": parent_cats,
    }
    return render(request, "writing.html", context)


def category(request, category):
    found_category = get_object_or_404(Category, visible=True, name=category)
    posts = Post.objects.filter(
        catergories__in=[found_category], published=True).order_by("-created")
    if request.user.is_staff:
        posts = Post.objects.filter(
            catergories__in=[found_category]).order_by("-created")
    context = {
        "category": found_category,
        "posts": posts,
    }
    return render(request, "category.html", context)


def search(request):
    tags_string = request.POST.get("search").replace(",", "/")
    return tags(request, tags_string)


def tags(request, tags):
    split_tags = tags.split("/")
    query = Q()
    for tag in split_tags:
        query = query | Q(tag__icontains=tag)
    tags = Tag.objects.filter(query)
    posts = Post.objects.filter(
        tags__in=tags, published=True).order_by("-created").distinct()
    if request.user.is_staff:
        posts = Post.objects.filter(
            tags__in=tags).order_by("-created").distinct()
    context = {
        "posts": posts,
        "tags": tags,
    }
    return render(request, "tags.html", context)


def post(request, category=None, slug=None):
    found_category = get_object_or_404(Category, visible=True, name=category)
    found_post = None
    if request.user.is_staff:
        found_post = get_object_or_404(
            Post, catergories=found_category, slug=slug)
    elif not request.user.is_staff:
        found_post = get_object_or_404(
            Post, catergories=found_category, slug=slug, published=True)
        read_post(request, category, slug, percent=0)
    context = {
        "post": found_post,
    }
    return render(request, "post.html", context)


def read_post(request, category=None, slug=None, percent=0):
    found_category = get_object_or_404(Category, visible=True, name=category)
    found_post = get_object_or_404(
        Post, catergories=found_category, slug=slug, published=True)
    ip_address = get_user_ip(request)
    read_item_exists = Readit.objects.filter(
        user_id=ip_address, post=found_post).exists()
    if read_item_exists:
        read_item = Readit.objects.get(user_id=ip_address, post=found_post)
        if read_item.percentage_read < percent:
            read_item.percentage_read = percent
            read_item.save()
    else:
        Readit.objects.create(
            user_id=ip_address, post=found_post, percentage_read=0)
    return HttpResponse(status=203)


def liked_post(request, category=None, slug=None):
    found_category = get_object_or_404(Category, visible=True, name=category)
    found_post = get_object_or_404(Post, catergories=found_category, slug=slug)
    ip_addr = get_user_ip(request)
    if not Vote.objects.filter(user_id=ip_addr, post=found_post).exists():
        Vote.objects.create(user_id=ip_addr, post=found_post)
    return HttpResponse(status=203)


def get_user_ip(request):
    ip_addr = request.META.get("HTTP_CF_CONNECTING_IP")
    if ip_addr:
        return ip_addr
    else:
        return request.META.get("REMOTE_ADDR")
