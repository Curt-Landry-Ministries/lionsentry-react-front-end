import localFont from 'next/font/local';

const inter = localFont({
    src: [
        {
            path: './Inter/Inter-Black.ttf',
            weight: '900',
            style: 'normal'
        },
        {
            path: './Inter/Inter-ExtraBold.ttf',
            weight: '800',
            style: 'normal'
        },
        {
            path: './Inter/Inter-Bold.ttf',
            weight: '700',
            style: 'normal'
        },
        {
            path: './Inter/Inter-SemiBold.ttf',
            weight: '600',
            style: 'normal'
        },
        {
            path: './Inter/Inter-Medium.ttf',
            weight: '500',
            style: 'normal'
        },
        {
            path: './Inter/Inter-Regular.ttf',
            weight: '400',
            style: 'normal'
        },
        {
            path: './Inter/Inter-Light.ttf',
            weight: '300',
            style: 'normal'
        },
        {
            path: './Inter/Inter-ExtraLight.ttf',
            weight: '200',
            style: 'normal'
        },
        {
            path: './Inter/Inter-Thin.ttf',
            weight: '100',
            style: 'normal'
        },
    ],
    variable: '--font-inter'
});

const astoria = localFont({
    src: [
        {
            path: './Astoria/AstoriaExtraBold.ttf',
            weight: '800',
            style: 'normal'
        },
        {
            path: './Astoria/AstoriaExtraBoldItalic.ttf',
            weight: '800',
            style: 'italic'
        },
        {
            path: './Astoria/AstoriaBold.ttf',
            weight: '700',
            style: 'normal'
        },
        {
            path: './Astoria/AstoriaBoldItalic.ttf',
            weight: '700',
            style: 'italic'
        },
        {
            path: './Astoria/AstoriaMedium.ttf',
            weight: '500',
            style: 'normal'
        },
        {
            path: './Astoria/AstoriaMediumItalic.ttf',
            weight: '500',
            style: 'italic'
        },
        {
            path: './Astoria/AstoriaRoman.ttf',
            weight: '400',
            style: 'normal'
        },
        {
            path: './Astoria/AstoriaRomanItalic.ttf',
            weight: '400',
            style: 'italic'
        },
        {
            path: './Astoria/AstoriaLight.ttf',
            weight: '300',
            style: 'normal'
        },
        {
            path: './Astoria/AstoriaLightItalic.ttf',
            weight: '300',
            style: 'italic'
        },
        {
            path: './Astoria/AstoriaExtraLight.ttf',
            weight: '200',
            style: 'normal'
        },
        {
            path: './Astoria/AstoriaExtraLightItalic.ttf',
            weight: '200',
            style: 'italic'
        }
    ],
    variable: '--font-astoria'
});

export { inter, astoria };