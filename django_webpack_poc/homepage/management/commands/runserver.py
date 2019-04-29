import os
import subprocess
import sys

from django.contrib.staticfiles.management.commands.runserver import (
    Command as RunserverCommand,
)


class Command(RunserverCommand):

    def handle(self, *args, **kwargs):
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

        super().handle(*args, **kwargs)

        webpack_process.kill()
