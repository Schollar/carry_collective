import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'; // Import Vuetify components
import * as directives from 'vuetify/directives'; // Import Vuetify directives
import 'vuetify/styles'; // Import Vuetify styles

// Create Vuetify instance
export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark', // Set default theme as 'dark'
        themes: {
            dark: {
                primary: '#38040E',
                secondary: '#81a1c1',
                background: '#2e3440',
                surface: '#3b4252',
                onSurface: '#eceff4',
                error: '#bf616a',
                success: '#00FF00',
                onError: '#eceff4',
                onPrimary: '#eceff4',
                onSecondary: '#eceff4',
                text: '#eceff4',
            },
            light: {
                primary: '#38040E',
                secondary: '#81a1c1',
                background: '#ffffff',
                surface: '#f5f5f5',
                onSurface: '#000000',
                error: '#bf616a',
                success: '#00FF00',
                onError: '#000000',
                onPrimary: '#000000',
                onSecondary: '#000000',
                text: '#000000',
            },
        },
    },
});