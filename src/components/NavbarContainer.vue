<script setup lang="ts">
import NavbarButton from '@/components/NavbarButton.vue';
import homeSvg from '@/assets/icons/ikon_hjem.svg';
import iconAddSvg from '@/assets/icons/ikon_tilfoj.svg';
import chatSvg from '@/assets/icons/ikon_besked.svg';
import profileSvg from '@/assets/icons/ikon_profil.svg';
import contractSvg from '@/assets/icons/ikon_kontrakt.svg';
import calendarSvg from '@/assets/icons/ikon_book.svg';

const links = {
    manager:[
        {
            name: 'Hjem',
            routeName: 'home',
            svgFilePath: homeSvg,
        },
        {
            name: 'Tilføj',
            routeName: 'createClient',
            svgFilePath: iconAddSvg,
        },
        {
            name: 'Besked',
            routeName: 'chat',
            svgFilePath: chatSvg,
        },
        {
            name: 'Profil',
            routeName: 'profile',
            svgFilePath: profileSvg,
        },
    ],
    client:[
        {
            name: 'Hjem',
            routeName: 'home',
            svgFilePath: homeSvg,
        },
        {
            name: 'Kontrakt',
            routeName: 'contract',
            svgFilePath: contractSvg,
        },
        {
            name: 'Book',
            routeName: 'calender',
            svgFilePath: calendarSvg,
        },
        {
            name: 'Besked',
            routeName: 'chat',
            svgFilePath: chatSvg,
        },
        {
            name: 'Profil',
            routeName: 'profile',
            svgFilePath: profileSvg,
        },
    ] };

</script>
