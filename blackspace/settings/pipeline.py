from local import DEBUG
PIPELINE_CSS = {
    'main': {
        'source_filenames': (
            'less/bootstrap.less',
            'css/*.css',
        ),
        'output_filename': 'css/style.min.css',
        'extra_context': {
            'media': 'screen,projection',
        },
    }
}

PIPELINE_JS = {
    'main': {
        'source_filenames': (
          'js/jquery-2.1.1.js',
          'js/animo.js',
          'js/generic_particles.js',
          'js/experiment_*.js',
          'js/main.js',
        ),
        'output_filename': 'js/main.min.js',
    },
    'playful': {
        'source_filenames': (
          'js/jquery-2.1.1.js',
          'js/animo.js',
          'js/generic_particles.js',
          'js/experiment_*.js',
          'js/main.js',
          'js/playfuljs.js',
        ),
        'output_filename': 'js/playful.min.js',
    },
    'life': {
        'source_filenames': (
          'js/jquery-2.1.1.js',
          'js/animo.js',
          'js/generic_particles.js',
          'js/experiment_*.js',
          'js/main.js',
          'js/life.js',
        ),
        'output_filename': 'js/life.min.js',
    },
    'canvas': {
        'source_filenames': (
          'js/jquery-2.1.1.js',
          'js/animo.js',
          'js/generic_particles.js',
          'js/experiment_*.js',
          'js/main.js',
          'js/canvas.js',
        ),
        'output_filename': 'js/canvas.min.js',
    },
}

for key, value in PIPELINE_JS.items():
  print key
  print value
  print DEBUG
  if not DEBUG:
    value['extra_context'] = {'async':True}
  PIPELINE_JS[key] = value

PIPELINE_COMPILERS = (
  'pipeline.compilers.less.LessCompiler',
)

PIPELINE_CSS_COMPRESSOR = 'pipeline.compressors.yuglify.YuglifyCompressor'
PIPELINE_JS_COMPRESSOR = 'pipeline.compressors.uglifyjs.UglifyJSCompressor'

STATICFILES_STORAGE = 'pipeline.storage.PipelineStorage'
