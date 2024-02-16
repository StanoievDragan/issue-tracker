'use client';
import React from 'react';
import Link from "next/link";
import {FaBug} from "react-icons/fa";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import {Skeleton} from "@/app/components";

const NavBar = () => {


    return (
        <nav className={"border-b mb-5 px-5 py-3 bg-slate-300"}>
            <Container>
            <Flex justify={"between"}>
                <Flex align={"center"} gap={'3'}>
                    <Link href={'/'}><FaBug/></Link>
                    <NavLinks></NavLinks>
                </Flex>
                <AuthStatus></AuthStatus>
            </Flex>
            </Container>
        </nav>
    );
};


const NavLinks = () => {
    const currentPath = usePathname();



    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues/list'},
    ]

    return (<ul className={"flex space-x-6"}>
        {links.map(link =>
            <li key={link.href}>
                <Link key={link.href}
                      className={classNames({
                          "nav-link": true,
                          '!text-zinc-900': link.href == currentPath,
                      })}
                      href={link.href}>{link.label}</Link></li>)}
    </ul>
    )
}

const AuthStatus = () => {
    const {status, data: session} = useSession();

    if (status === "loading") return <Skeleton width={'3rem'}></Skeleton>;

    if (status === "unauthenticated")
        return <Link className={'nav-link'} href={'/api/auth/signin'}>Login</Link>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback={"?"}
                        size={'2'}
                        radius={'full'}
                        className={'cursor-pointer'}
                    ></Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size={'2'}>
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href={'/api/auth/signout'}>Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
   )
}

export default NavBar;