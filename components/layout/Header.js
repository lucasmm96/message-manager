import Link from 'next/link';
import { useMedia } from 'react-use';

import classes from '@/components/layout/Header.module.css';

import IconLink from '@/components/ui/IconLink';

function MainNavigation() {
	const defaultState = false;
	const smallScreen = useMedia('(max-width: 768px)', defaultState);

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
					{smallScreen && (
						<li className={classes.right}>
							<IconLink
								href={'/auth'}
								newTab={false}
								filename="bars-solid.svg"
								alt="Options"
								w={20}
								h={20}
							/>
						</li>
					)}
					{!smallScreen && (
						<>
							<li className={classes.right}>
								<IconLink
									href={'/auth'}
									newTab={false}
									filename="circle-user-solid.svg"
									alt="Auth"
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
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
