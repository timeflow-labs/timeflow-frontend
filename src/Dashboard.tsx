import { FunctionComponent } from 'react';
import styles from './Dashboard.module.css';

const Dashboard: FunctionComponent = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.navigation}>
        <div className={styles.leftSide} />
        <div className={styles.help}>Help</div>
        <div className={styles.contactUs}>Contact Us</div>
        <div className={styles.settings}>Settings</div>
        <div className={styles.schedules}>Schedules</div>
        <div className={styles.focusmode}>Focusmode</div>
        <b className={styles.dashboard2}>Dashboard</b>
        <img
          className={styles.transactionIcon}
          alt="Focusmode"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm1 2v7h-2V6h2Zm0 9v2h-2v-2h2Z'/%3E%3C/svg%3E"
        />
        <img
          className={styles.scheduleIcon}
          alt="Schedules"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M7 3h2v2h6V3h2v2h3v16H4V5h3V3Zm12 6H5v10h14V9Zm-9 2h2v2H10v-2Zm0 3h2v2H10v-2Zm3-3h2v2h-2v-2Zm0 3h2v2h-2v-2Z'/%3E%3C/svg%3E"
        />
        <img
          className={styles.dashboardIcon}
          alt="Dashboard"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M4 13h6v7H4v-7Zm10-9h6v16h-6V4ZM4 4h6v7H4V4Zm10 9h6v7h-6v-7Z'/%3E%3C/svg%3E"
        />
        <img
          className={styles.settingIcon}
          alt="Settings"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M12 8.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Zm0-6l2.2 1.6l2.6-.5l1.1 2.4l2.6.9l-.3 2.7l2 1.8l-2 1.8l.3 2.7l-2.6.9l-1.1 2.4l-2.6-.5L12 22l-2.2-1.6l-2.6.5l-1.1-2.4l-2.6-.9l.3-2.7l-2-1.8l2-1.8l-.3-2.7l2.6-.9l1.1-2.4l2.6.5L12 2.5Z'/%3E%3C/svg%3E"
        />
        <b className={styles.timeflow}>TIMEFLOW</b>
      </div>
      <div className={styles.header}>
        <b className={styles.helloGayeon}>
          <span>{`Hello, `}</span>
          <span className={styles.gayeon}>Gayeon</span>
          <span className={styles.span}>{`!    `}</span>
        </b>
        <img
          className={styles.vectorIcon}
          alt="Notifications"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2a7 7 0 0 1 7 7v4.7l1.7 3.4c.3.5-.1 1.2-.7 1.2H4a1 1 0 0 1-.9-1.5L4.7 13.7V9a7 7 0 0 1 7-7Zm0 20a2.5 2.5 0 0 1-2.45-2h4.9A2.5 2.5 0 0 1 12 22Z'/%3E%3C/svg%3E"
        />
      </div>
      <b className={styles.myGarden}>MY Garden</b>
      <div className={styles.activitiesCard}>
        <div className={styles.card}>
          <div className={styles.card2} />
        </div>
      </div>
      <div className={styles.activitiesCard2}>
        <div className={styles.card3}>
          <div className={styles.card2} />
        </div>
      </div>
      <div className={styles.topProductsCard}>
        <div className={styles.card5}>
          <div className={styles.card2} />
        </div>
        <div className={styles.div}>
          <div className={styles.child} />
          <b className={styles.adsp}>ADSP</b>
          <div className={styles.div2}>55%</div>
        </div>
        <div className={styles.mayJune2021Wrapper}>
          <div className={styles.mayJune}>May - June 2021</div>
        </div>
        <img
          className={styles.vectorIcon2}
          alt="More options"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm0 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm0 7a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z'/%3E%3C/svg%3E"
        />
        <div className={styles.div3}>
          <div className={styles.item} />
          <b className={styles.aibt}>AIBT</b>
          <div className={styles.div2}>31%</div>
        </div>
        <div className={styles.div5}>
          <div className={styles.inner} />
          <b className={styles.sqld}>SQLD</b>
          <div className={styles.div2}>14%</div>
        </div>
        <b className={styles.topFocus}>Top Focus</b>
        <img
          className={styles.pieChartIcon}
          alt="Pie chart"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath fill='%23F6DC7D' d='M100 10a90 90 0 0 1 0 180V10Z'/%3E%3Cpath fill='%2398D89E' d='M100 10a90 90 0 0 1 90 90H100V10Z'/%3E%3Cpath fill='%23EE8484' d='M100 100v90a90 90 0 0 1-82.4-52.4L100 100Z'/%3E%3C/svg%3E"
        />
      </div>
      <div className={styles.schedulesCard}>
        <div className={styles.card7}>
          <div className={styles.card2} />
        </div>
        <b className={styles.todaysSchedule}>Today’s schedule</b>
        <b className={styles.todayFocus}>Today Focus</b>
        <b className={styles.avgFocusLevel}>Avg Focus Level</b>
        <div className={styles.meetingWithSuppliersFromKuParent}>
          <b className={styles.meetingWithSuppliers}>Meeting with suppliers from Kuta Bali</b>
          <div className={styles.div7}>14.00-15.00</div>
          <div className={styles.atSunsetRoad}>{`at Sunset Road, Kuta, Bali `}</div>
          <div className={styles.groupChild} />
        </div>
        <div className={styles.seeAll}>See All</div>
        <img
          className={styles.vectorIcon3}
          alt="More"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 5l7 7-7 7-1.4-1.4L15.2 13H5v-2h10.2L10.6 6.4 12 5Z'/%3E%3C/svg%3E"
        />
        <div className={styles.checkOperationAtGigaFactorParent}>
          <b className={styles.checkOperationAt}>Check operation at Giga Factory 1</b>
          <div className={styles.div7}>18.00-20.00</div>
          <div className={styles.atCentralJakarta}>{`at Central Jakarta `}</div>
          <div className={styles.groupItem} />
        </div>
      </div>
      <div className={styles.schedulesCard2}>
        <div className={styles.card9}>
          <div className={styles.card2} />
        </div>
        <b className={styles.todaysSchedule2}>Today’s schedule</b>
        <b className={styles.streak}>Streak</b>
        <div className={styles.meetingWithHyojeongParent}>
          <b className={styles.meetingWithHyojeong}>Meeting with HyoJeong</b>
          <div className={styles.div9}>14.00-15.00</div>
          <div className={styles.atSunsetRoad2}>{`at Sunset Road, Kuta, Bali `}</div>
          <div className={styles.groupChild} />
        </div>
        <div className={styles.seeAll2}>See All</div>
        <img
          className={styles.vectorIcon4}
          alt="More"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 5l7 7-7 7-1.4-1.4L15.2 13H5v-2h10.2L10.6 6.4 12 5Z'/%3E%3C/svg%3E"
        />
        <div className={styles.checkOperationAtGigaFactorGroup}>
          <b className={styles.meetingWithHyojeong}>Check operation at Giga Factory 1</b>
          <div className={styles.div9}>18.00-20.00</div>
          <div className={styles.atSunsetRoad2}>{`at Central Jakarta `}</div>
          <div className={styles.groupItem} />
        </div>
      </div>
      <b className={styles.areYouReady}>Are you ready to be immersed again today?</b>
      <img
        className={styles.trophyIcon}
        alt="Trophy"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23F5C644' d='M5 2h14v2h2v3a5 5 0 0 1-5 5h-2v2.3a5 5 0 0 0 3 4.57V21H6v-1.13A5 5 0 0 0 9 14.3V12H7a5 5 0 0 1-5-5V4h3V2Zm-1 4a3 3 0 0 0 3 3h2V6H4Zm15 3a3 3 0 0 0 3-3h-5v3Z'/%3E%3C/svg%3E"
      />
      <div className={styles.wavingHand}>
        <img
          className={styles.wavingHandIcon}
          alt="Waving hand"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'%3E%3Cpath fill='%23F5C644' d='m10.6 2.5l1.8.9l-5.6 11l-1.8-.9l5.6-11Zm10 5l.9 1.8l-6 3l-3-6l1.8-.9l2.4 4.8l3.9-1.9Zm-1.7 5.6l.9 1.8l-4.2 2.1l-2.1 4.2l-1.8-.9l3-6l4.2-2.1Zm-10.9-5l1.8.9l-3 6l-1.8-.9l3-6Zm-4.2 5.1l1.8.9l-2.4 4.8l-1.8-.9l2.4-4.8Z'/%3E%3C/svg%3E"
        />
      </div>
      <div className={styles.smilingFaceWithSunglasses}>
        <img
          className={styles.smilingFaceWithSunglassesF}
          alt="Smiling face with sunglasses"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 24 24'%3E%3Cpath fill='%23F5C644' d='M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20Zm6 6.5h-2.4l-.6 1H9l-.6-1H6v2h12v-2ZM8 13a4 4 0 0 0 8 0H8Z'/%3E%3C/svg%3E"
        />
      </div>
      <img
        className={styles.seedlingIcon}
        alt="Seedling"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Cpath fill='%2348A57F' d='M13 3a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5v10.17c1.17.41 2 1.52 2 2.83V22h-2v-3a1 1 0 0 0-2 0v3H9v-3a3.001 3.001 0 0 1 2-2.83V10a7 7 0 0 0-7 7H2a9 9 0 0 1 9-9V3h2Z'/%3E%3C/svg%3E"
      />
      <div className={styles.div11}>12일 연속 학습 중 !</div>
      <div className={styles.div12}>오늘 총 공부 시간 : 4시간 !</div>
      <div className={styles.div13}>최근 집중도 평균 : 2.7시간 !</div>
      <img
        className={styles.kakaotalk202512052123403281Icon}
        alt="Garden illustration"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23EAF7F1'/%3E%3Ccircle cx='200' cy='220' r='120' fill='%2348A57F' opacity='.3'/%3E%3Cpath fill='%2398D89E' d='M180 310c-20-20-40-60-30-110s60-90 100-80s70 60 40 120s-90 100-110 70Z'/%3E%3Cpath fill='%23EE8484' d='M140 250c-30-10-60-50-50-90s50-70 80-60s40 60 10 100s-20 60-40 50Z'/%3E%3Cpath fill='%23F6DC7D' d='M250 330c-10-20 0-40 20-70s50-60 70-50s10 50-20 80s-60 60-70 40Z'/%3E%3C/svg%3E"
      />
      <img
        className={styles.kakaotalk202506141319546192Icon}
        alt="Profile"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24'%3E%3Cpath fill='%23CCCCCC' d='M12 2a5 5 0 0 1 5 5a5 5 0 1 1-5-5Zm0 12c4.4 0 8 2.7 8 6v2H4v-2c0-3.3 3.6-6 8-6Z'/%3E%3C/svg%3E"
      />
    </div>
  );
};

export default Dashboard;
