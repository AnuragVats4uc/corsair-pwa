module.exports = {
    extends: ['@corratech'],
    ignorePatterns: [
        'public/scripts/**/*.js',
        'data-layer-helper.js',
        'migration/contentful/*'
    ],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton']
            }
        ]
    }
}
