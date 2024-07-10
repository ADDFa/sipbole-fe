namespace Dashboard {
    interface NavItem {
        to: string
        className?: string
        icon: any
        text: string
    }

    interface Nav {
        admin: NavItem[]
        user: NavItem[]
    }
}
