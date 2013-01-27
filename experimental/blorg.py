from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('./templates'))

template = env.get_template('foo.html')

print template.render(the='variables', go='here')

