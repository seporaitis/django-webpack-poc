import atexit
import os
import subprocess
import sys
from contextlib import contextmanager

from django.conf import settings
from django.contrib.staticfiles.management.commands.runserver import (
    Command as RunserverCommand,
)


def cleanup(process):
    if process.poll() is None:
        print('Killing webpack...')
        process.kill()


@contextmanager
def webpack():
    webpack_process = subprocess.Popen(
        ['npx', 'webpack', '--config', 'webpack.config.js', '--watch', '--progress'],
        cwd=os.path.join(
            os.path.dirname(__file__),
            '../../../../static_source/',
        ),
        stdin=None,
        stdout=sys.stdout,
        stderr=sys.stderr,
    )

    atexit.register(cleanup, webpack_process)

    yield

    webpack_process.kill()


@contextmanager
def nullcontext():
    # NOTE(JS): backport
    yield


class Command(RunserverCommand):

    def inner_run(self, *args, **options):
        ctx = nullcontext
        if settings.DEBUG:
            ctx = webpack

        with ctx():
            super().inner_run(*args, **options)
