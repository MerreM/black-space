
PIPELINE_CSS = {
    'main': {
        'source_filenames': (
          'css/*.css',
        ),
        'output_filename': 'css/style.min.css',
    },
}

PIPELINE_JS = {
    'main': {
        'source_filenames': (
          'js/*.js',
        ),
        'output_filename': 'js/main.min.js',
    },
}

PIPELINE_COMPILERS = (
  'pipeline.compilers.less.LessCompiler',
)

PIPELINE_CSS_COMPRESSOR = 'pipeline.compressors.yuglify.YuglifyCompressor'
PIPELINE_JS_COMPRESSOR = 'pipeline.compressors.yuglify.YuglifyCompressor'

STATICFILES_STORAGE = 'pipeline.storage.PipelineStorage'
