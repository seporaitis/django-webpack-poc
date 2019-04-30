import os
import subprocess
import sys
from contextlib import contextmanager

from django.conf import settings
from django.contrib.staticfiles.management.commands.runserver import (
    Command as RunserverCommand,
)


@contextmanager
def webpack():
    webpack_process = subprocess.Popen(
        ['npx', 'webpack', '--config', 'webpack.config.js', '--watch'],
        cwd=os.path.join(
            os.path.dirname(__file__),
            '../../static_source/',
        ),
        stdin=None,
        stdout=sys.stdout,
        stderr=sys.stderr,
    )

    yield

    webpack_process.kill()


@contextmanager
def nullcontext():
    # NOTE(JS): backport
    yield


class Command(RunserverCommand):

    def handle(self, *args, **kwargs):
        ctx = nullcontext
        if settings.DEBUG:
            ctx = webpack

        with ctx():
            super().handle(*args, **kwargs)
