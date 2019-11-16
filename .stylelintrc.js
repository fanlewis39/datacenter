module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
    'stylelint-scss',
    'stylelint-prettier'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'declaration-property-value-blacklist': {
      '/^transition/': ['/all/'],
      '/^background/': ['http:', 'https:'],
      '/^border/': ['none'],
      '/.+/': ['initial']
    },
    'media-feature-name-no-vendor-prefix': true,
    'prettier/prettier': true,
    'property-no-vendor-prefix': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
        browsers: [
          '> 5%',
          'last 2 firefox versions',
          'last 2 chrome versions',
          'last 2 safari versions',
          'last 2 edge versions'
        ]
      }
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'each',
          'error',
          'return'
        ]
      }
    ],
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true
  }
}
