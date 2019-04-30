import os
import subprocess
import sys

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        subprocess.run(
            ['npx', 'webpack', '--config', 'webpack.config.js', '--progress', '--env.production'],
            cwd=os.path.join(
                os.path.dirname(__file__),
                '../../static_source',
            ),
            stdin=None,
            stdout=sys.stdout,
            stderr=sys.stderr,
        )
