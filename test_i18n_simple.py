#!/usr/bin/env python
import os
import sys
import django
from django.conf import settings

# Add the project directory to Python path
sys.path.insert(0, '/Users/wangfeng/Desktop/projects/label-studio-develop')
sys.path.insert(0, '/Users/wangfeng/Desktop/projects/label-studio-develop/label_studio')

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.label_studio')

# Setup Django
django.setup()

from django.utils import translation
from django.utils.translation import gettext as _

print("Testing Django i18n functionality...")
print(f"USE_I18N: {settings.USE_I18N}")
print(f"LOCALE_PATHS: {getattr(settings, 'LOCALE_PATHS', 'Not set')}")
print(f"LANGUAGE_CODE: {settings.LANGUAGE_CODE}")

# Test English
translation.activate('en')
print(f"\nCurrent language: {translation.get_language()}")
print(f"English - ID: '{_('ID')}'")
print(f"English - Annotations: '{_('Annotations')}'")
print(f"English - Completed: '{_('Completed')}'")

# Test Chinese
translation.activate('zh')
print(f"\nCurrent language: {translation.get_language()}")
print(f"Chinese - ID: '{_('ID')}'")
print(f"Chinese - Annotations: '{_('Annotations')}'")
print(f"Chinese - Completed: '{_('Completed')}'")

# Test Chinese Hans
translation.activate('zh-hans')
print(f"\nCurrent language: {translation.get_language()}")
print(f"Chinese Hans - ID: '{_('ID')}'")
print(f"Chinese Hans - Annotations: '{_('Annotations')}'")
print(f"Chinese Hans - Completed: '{_('Completed')}'")

print("\nTest completed.")