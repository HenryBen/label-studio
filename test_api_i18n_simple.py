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

def test_api_i18n_simple():
    print("Testing API i18n functionality (simple version)...")
    
    # Try to get existing user and project
    try:
        user = User.objects.first()
        if not user:
            print("No users found in database")
            return
            
        project = Project.objects.first()
        if not project:
            print("No projects found in database")
            return
            
        print(f"Using user: {user.username}, project: {project.title}")
        
        # Create mock requests with different languages
        factory = RequestFactory()
        
        # Test English
        request_en = factory.get('/api/dm/columns/', {'project': project.id, 'language': 'en'})
        request_en.user = user
        
        print("\n=== Testing English (en) ===")
        try:
            columns_en = get_all_columns(project, user, request_en)
            for col in columns_en['columns'][:3]:  # Show first 3 columns
                print(f"ID: {col['id']}, Title: {col['title']}, Help: {col.get('help', 'N/A')}")
        except Exception as e:
            print(f"Error with English: {e}")
            return
        
        # Test Chinese
        request_zh = factory.get('/api/dm/columns/', {'project': project.id, 'language': 'zh'})
        request_zh.user = user
        
        print("\n=== Testing Chinese (zh) ===")
        try:
            columns_zh = get_all_columns(project, user, request_zh)
            for col in columns_zh['columns'][:3]:  # Show first 3 columns
                print(f"ID: {col['id']}, Title: {col['title']}, Help: {col.get('help', 'N/A')}")
        except Exception as e:
            print(f"Error with Chinese: {e}")
            return
        
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
        
        print(f"English\t\t| {id_en}\t\t| {annotations_en}\t| {completed_en}")
        print(f"Chinese\t\t| {id_zh}\t\t| {annotations_zh}\t\t| {completed_zh}")
        
        # Check if translations are working
        if annotations_zh == '标注' and completed_zh == '已完成':
            print("\n✅ API i18n is working correctly!")
        else:
            print("\n❌ API i18n is not working as expected.")
        
        print("\nTest completed successfully!")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    test_api_i18n_simple()