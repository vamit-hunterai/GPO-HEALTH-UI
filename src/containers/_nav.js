/**
 * Author: Lakshman Veti
 * Type: Navigation Object
 * Objective: To render Sidebar Navigation
 * Associated Route/Usage: Layout
*/

/*
function changeTheme(theme){
  //console.log(theme)
  var el = document.getElementById('theme_css');
  el.setAttribute('href', '/'+theme+'.css');
  localStorage.setItem('theme',theme)
}
*/

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Upload',
    to: '/upload',
    icon: 'cil-cloud-upload',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Search',
    route: '/search',
    icon: 'cil-search',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Resources',
        to: '/search/segment-resources',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Milestones',
        to: '/search/segment-milestones'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Commercials',
        to: '/search/segment-commercials'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Contacts',
        to: '/search/segment-contacts'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Invoices',
        to: '/search/segment-invoices'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'PO',
        to: '/'
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Dashboard',
    route: '/dashboard',
    icon: 'cil-speedometer',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'F&B',
        href: 'https://app.powerbi.com/reportEmbed?reportId=2952484e-de7d-4003-bf5c-d0f4fefe87e7&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c',
        target: '_blank'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'IT',
        href: 'https://app.powerbi.com/reportEmbed?reportId=7b442a6b-77f2-4469-a1d4-6c7d5b3751a7&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c',
        target: '_blank'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Medical equipment',
        href: 'https://app.powerbi.com/reportEmbed?reportId=11c9a0aa-b423-4f50-9cf2-dc2a181a3c1e&autoAuth=true&ctid=1685ee7a-5191-4b15-b097-af0b89a8832c',
        target: '_blank'
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'API Admin',
    href: 'https://devapi.hunterai.com',
    target: '_blank'
  }
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Theme',
  //   route: '/theme',
  //   icon: 'cil-drop',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Classic',
  //       route: '/theme',
  //         onClick: e => {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           changeTheme('classic');
  //         }
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Dark',
  //         onClick: e => {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           changeTheme('dark');
  //         }
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Gold',
  //         onClick: e => {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           changeTheme('gold');
  //         }
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Blue',
  //         onClick: e => {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           changeTheme('blue');
  //         }
  //     }
  //   ]
  // }
]

export default _nav;
