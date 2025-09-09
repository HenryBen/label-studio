#!/usr/bin/env python3

import os
import sys
import django
from django.conf import settings

# Add the project directory to Python path
sys.path.insert(0, '/Users/wangfeng/Desktop/projects/label-studio-develop')
sys.path.insert(0, '/Users/wangfeng/Desktop/projects/label-studio-develop/label_studio')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.label_studio')
django.setup()

from django.test import RequestFactory
from users.models import User
from projects.models import Project
from organizations.models import Organization
from data_manager.functions import get_all_columns
from django.utils import translation

def test_api_i18n():
    print("Testing API i18n functionality...")
    
    # Get or create a test user
    try:
        user = User.objects.get(username='testuser')
    except User.DoesNotExist:
        import uuid
        unique_email = f'test_{uuid.uuid4().hex[:8]}@example.com'
        user = User.objects.create_user(
            username='testuser',
            email=unique_email
        )
    
    # Create or get organization
    org, created = Organization.objects.get_or_create(
        title='Test Organization',
        defaults={'created_by': user}
    )
    
    # Create a test project
    project, created = Project.objects.get_or_create(
        title='Test Project',
        defaults={
            'created_by': user,
            'organization': org,
            'label_config': '<View><Text name="text" value="$text"/><Choices name="label" toName="text"><Choice value="pos"/><Choice value="neg"/></Choices></View>'
        }
    )
    
    # Create mock requests with different languages
    factory = RequestFactory()
    
    # Test English
    request_en = factory.get('/api/dm/columns/', {'project': project.id, 'language': 'en'})
    request_en.user = user
    
    print("\n=== Testing English (en) ===")
    columns_en = get_all_columns(project, user, request_en)
    for col in columns_en['columns'][:5]:  # Show first 5 columns
        print(f"ID: {col['id']}, Title: {col['title']}, Help: {col.get('help', 'N/A')}")
    
    # Test Chinese
    request_zh = factory.get('/api/dm/columns/', {'project': project.id, 'language': 'zh'})
    request_zh.user = user
    
    print("\n=== Testing Chinese (zh) ===")
    columns_zh = get_all_columns(project, user, request_zh)
    for col in columns_zh['columns'][:5]:  # Show first 5 columns
        print(f"ID: {col['id']}, Title: {col['title']}, Help: {col.get('help', 'N/A')}")
    
    # Test Chinese Simplified
    request_zh_hans = factory.get('/api/dm/columns/', {'project': project.id, 'language': 'zh-hans'})
    request_zh_hans.user = user
    
    print("\n=== Testing Chinese Simplified (zh-hans) ===")
    columns_zh_hans = get_all_columns(project, user, request_zh_hans)
    for col in columns_zh_hans['columns'][:5]:  # Show first 5 columns
        print(f"ID: {col['id']}, Title: {col['title']}, Help: {col.get('help', 'N/A')}")
    
    print("\n=== Comparison ===")
    print("Language\t| ID\t\t| Annotations\t| Completed")
    print("-" * 60)
    
    # Find specific columns for comparison
    def find_column(columns, col_id):
        for col in columns:
            if col['id'] == col_id:
                return col['title']
        return 'Not found'
    
    id_en = find_column(columns_en['columns'], 'id')
    annotations_en = find_column(columns_en['columns'], 'total_annotations')
    completed_en = find_column(columns_en['columns'], 'completed_at')
    
    id_zh = find_column(columns_zh['columns'], 'id')
    annotations_zh = find_column(columns_zh['columns'], 'total_annotations')
    completed_zh = find_column(columns_zh['columns'], 'completed_at')
    
    id_zh_hans = find_column(columns_zh_hans['columns'], 'id')
    annotations_zh_hans = find_column(columns_zh_hans['columns'], 'total_annotations')
    completed_zh_hans = find_column(columns_zh_hans['columns'], 'completed_at')
    
    print(f"English\t\t| {id_en}\t\t| {annotations_en}\t| {completed_en}")
    print(f"Chinese\t\t| {id_zh}\t\t| {annotations_zh}\t\t| {completed_zh}")
    print(f"Chinese-Hans\t| {id_zh_hans}\t\t| {annotations_zh_hans}\t\t| {completed_zh_hans}")
    
    print("\nTest completed successfully!")

if __name__ == '__main__':
    test_api_i18n()