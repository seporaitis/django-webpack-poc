from vanilla import TemplateView


class IndexView(TemplateView):
    template_name = 'index.html'


index = IndexView.as_view()


class DashboardView(TemplateView):
    template_name = 'dashboard.html'


dashboard = DashboardView.as_view()
