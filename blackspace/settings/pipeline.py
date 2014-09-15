
PIPELINE_CSS = {
    'main': {
        'source_filenames': (
          'css/*.css',
        ),
        'output_filename': 'css/style.min.css',
    },
    'bootstrap': {
        'source_filenames': (
            'less/bootstrap.less',
        ),
        'output_filename': 'css/b.css',
        'extra_context': {
            'media': 'screen,projection',
        },
    },
    'animo': {
        'source_filenames': (
            'css/animate_animo.css',
        ),
        'output_filename': 'css/c.css',
        'extra_context': {
            'media': 'screen,projection',
        },
    },
}

PIPELINE_JS = {
    'main': {
        'source_filenames': (
          'js/main.js',
          'js/generic_particles.js',
          'js/experiment_*.js',
        ),
        'output_filename': 'js/main.min.js',
    },
    'animo': {
        'source_filenames': (
            'js/animo.js',
        ),
        'output_filename': 'js/c.js',
        'extra_context': {
            'media': 'screen,projection',
        },
    },
    'playful': {
        'source_filenames': (
          'js/playfuljs.js',
        ),
        'output_filename': 'js/playful.min.js',
    },
    'canvas': {
        'source_filenames': (
          'js/canvas.js',
        ),
        'output_filename': 'js/canvas.min.js',
    },
    'bootstrap': {
        'source_filenames': (
          'bootstrap-js/js/transition.js',
          'bootstrap-js/js/modal.js',
          'bootstrap-js/js/dropdown.js',
          'bootstrap-js/js/scrollspy.js',
          'bootstrap-js/js/tab.js',
          'bootstrap-js/js/tooltip.js',
          'bootstrap-js/js/popover.js',
          'bootstrap-js/js/alert.js',
          'bootstrap-js/js/button.js',
          'bootstrap-js/js/collapse.js',
          'bootstrap-js/js/carousel.js',
          'bootstrap-js/js/affix.js',
        ),
        'output_filename': 'js/b.js',
      },
}

PIPELINE_COMPILERS = (
  'pipeline.compilers.less.LessCompiler',
)

PIPELINE_CSS_COMPRESSOR = 'pipeline.compressors.yuglify.YuglifyCompressor'
PIPELINE_JS_COMPRESSOR = 'pipeline.compressors.yuglify.YuglifyCompressor'

STATICFILES_STORAGE = 'pipeline.storage.PipelineStorage'
