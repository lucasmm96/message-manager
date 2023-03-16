import Link from 'next/link';

import classes from '@/components/layout/Header.module.css';

import IconLink from '@/components/ui/IconLink';

function MainNavigation() {
	return (
		<header className={classes.header}>
			<nav>
				<ul>
					<li className={`${classes.logo} ${classes.left}`}>
						<IconLink
							href={'/'}
							newTab={false}
							filename="logo.svg"
							alt="Logo"
							text="Message Manager"
							w={20}
							h={20}
						/>
					</li>
					<li className={classes.right}>
						<Link href="/add-message">Add New Message</Link>
					</li>
					<li className={classes.right}>
						<Link href="/">All Messages</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
