import { FunctionComponent } from 'react';
import styles from './Schedules.module.css';

const Schedules: FunctionComponent = () => {
  return (
    <div className={styles.schedules}>
      <div className={styles.navigation}>
        <div className={styles.leftSide} />
        <div className={styles.help}>Help</div>
        <div className={styles.contactUs}>Contact Us</div>
        <div className={styles.settings}>Settings</div>
        <b className={styles.schedules2}>Schedules</b>
        <div className={styles.focusmode}>Focusmode</div>
        <div className={styles.dashboard}>Dashboard</div>
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
        <b className={styles.schedules3}>Schedules</b>
        <img
          className={styles.vectorIcon}
          alt="Notifications"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2a7 7 0 0 1 7 7v4.7l1.7 3.4c.3.5-.1 1.2-.7 1.2H4a1 1 0 0 1-.9-1.5L4.7 13.7V9a7 7 0 0 1 7-7Zm0 20a2.5 2.5 0 0 1-2.45-2h4.9A2.5 2.5 0 0 1 12 22Z'/%3E%3C/svg%3E"
        />
      </div>
      <div className={styles.schedulesCard}>
        <div className={styles.leftCard}>
          <div className={styles.leftCard}>
            <div className={styles.card2} />
          </div>
          <div className={styles.calendar}>
            <div className={styles.days}>
              <div className={styles.row}>
                <div className={styles.weekday}>
                  <div className={styles.sunday}>Sunday</div>
                </div>
                <div className={styles.weekday}>
                  <div className={styles.sunday}>Monday</div>
                </div>
                <div className={styles.weekday}>
                  <div className={styles.sunday}>Tuesday</div>
                </div>
                <div className={styles.weekday4}>
                  <div className={styles.wednesday}>Wednesday</div>
                </div>
                <div className={styles.weekday}>
                  <div className={styles.sunday}>Thursday</div>
                </div>
                <div className={styles.weekday}>
                  <div className={styles.sunday}>Friday</div>
                </div>
                <div className={styles.weekday}>
                  <div className={styles.sunday}>Saturday</div>
                </div>
              </div>
            </div>
            <div className={styles.header2}>
              <b className={styles.dec2025}>DEC 2025</b>
              <div className={styles.iconChevronRightParent}>
                <img
                  className={styles.iconChevronRight}
                  alt="Next month"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m9 6l6 6l-6 6l-1.4-1.4L12.2 12L7.6 7.4L9 6Z'/%3E%3C/svg%3E"
                />
                <img
                  className={styles.iconChevronLeft}
                  alt="Previous month"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m15 18l-6-6l6-6l1.4 1.4L11.8 12l4.6 4.6L15 18Z'/%3E%3C/svg%3E"
                />
              </div>
            </div>
            <div className={styles.days2}>
              <div className={styles.dateDefault}>
                <div className={styles.div}>2</div>
              </div>
              <div className={styles.dateDefault2}>
                <div className={styles.div}>7</div>
              </div>
              <div className={styles.dateDefault3}>
                <div className={styles.div}>14</div>
              </div>
              <div className={styles.dateDefault4}>
                <div className={styles.div}>21</div>
              </div>
              <div className={styles.dateDefault5}>
                <div className={styles.div}>28</div>
              </div>
              <div className={styles.dateDefault6}>
                <div className={styles.div}>9</div>
              </div>
              <div className={styles.dateDefault7}>
                <div className={styles.div}>16</div>
              </div>
              <div className={styles.dateDefault8}>
                <div className={styles.div}>23</div>
              </div>
              <div className={styles.dateDefault9}>
                <div className={styles.div}>30</div>
              </div>
              <div className={styles.dateInactive}>
                <div className={styles.div}>30</div>
              </div>
              <div className={styles.dateDefault10}>
                <div className={styles.div}>8</div>
              </div>
              <div className={styles.dateDefault11}>
                <div className={styles.div}>15</div>
              </div>
              <div className={styles.dateDefault12}>
                <div className={styles.div}>22</div>
              </div>
              <div className={styles.dateDefault13}>
                <div className={styles.div}>29</div>
              </div>
              <div className={styles.dateInactive2}>
                <div className={styles.div}>1</div>
              </div>
              <div className={styles.dateDefault14}>
                <div className={styles.div}>3</div>
              </div>
              <div className={styles.dateDefault15}>
                <div className={styles.div}>10</div>
              </div>
              <div className={styles.dateDefault16}>
                <div className={styles.div}>17</div>
              </div>
              <div className={styles.dateDefault17}>
                <div className={styles.div}>24</div>
              </div>
              <div className={styles.dateDefault18}>
                <div className={styles.div}>31</div>
              </div>
              <div className={styles.dateDefault19}>
                <div className={styles.div}>4</div>
              </div>
              <div className={styles.dateDefault20}>
                <div className={styles.div}>11</div>
              </div>
              <div className={styles.dateDefault21}>
                <div className={styles.div}>18</div>
              </div>
              <div className={styles.dateDefault22}>
                <div className={styles.div}>25</div>
              </div>
              <div className={styles.dateDefault23}>
                <div className={styles.div}>13</div>
              </div>
              <div className={styles.dateDefault24}>
                <div className={styles.div}>20</div>
              </div>
              <div className={styles.dateDefault25}>
                <div className={styles.div}>27</div>
              </div>
              <div className={styles.dateActive}>
                <div className={styles.div28}>6</div>
              </div>
              <div className={styles.dateInactive3}>
                <div className={styles.div}>1</div>
              </div>
              <div className={styles.dateInactive4}>
                <div className={styles.div}>3</div>
              </div>
              <div className={styles.dateDefault26}>
                <div className={styles.div}>12</div>
              </div>
              <div className={styles.dateDefault27}>
                <div className={styles.div}>26</div>
              </div>
              <div className={styles.dateDefault28}>
                <div className={styles.div}>5</div>
              </div>
              <div className={styles.dateDefault29}>
                <div className={styles.div}>19</div>
              </div>
              <div className={styles.dateInactive5}>
                <div className={styles.div}>2</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightCard}>
          <div className={styles.card3}>
            <div className={styles.card2} />
          </div>
          <div className={styles.meetingWithSuppliersParent}>
            <b className={styles.meetingWithSuppliers}>Meeting with suppliers</b>
            <div className={styles.div36}>14.00-15.00</div>
            <div className={styles.atSunsetRoad}>{`at Sunset Road, Kuta, Bali `}</div>
            <div className={styles.groupChild} />
          </div>
          <div className={styles.checkOperationAtGigaFactorParent}>
            <b className={styles.checkOperationAt}>Check operation at Giga Factory</b>
            <div className={styles.div37}>18.00-20.00</div>
            <div className={styles.atCentralJakarta}>{`at Central Jakarta `}</div>
            <img
              className={styles.groupItem}
              alt="Schedule color"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='73' viewBox='0 0 10 73'%3E%3Crect width='10' height='73' fill='%236972c3'/%3E%3C/svg%3E"
            />
          </div>
          <b className={styles.schedules4}>Schedules</b>
          <div className={styles.buttonAdd}>
            <div className={styles.buttonPrimary}>
              <div className={styles.buttonPrimary2} />
            </div>
            <b className={styles.add}>Add</b>
            <img
              className={styles.groupIcon}
              alt="Add"
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M11 5h2v14h-2V5Zm-6 6h14v2H5v-2Z'/%3E%3C/svg%3E"
            />
          </div>
        </div>
      </div>
      <div className={styles.schedulesChild} />
      <div className={styles.noCurrentData}>No Current Data</div>
      <b className={styles.weeklyFocusChart}>Weekly Focus Chart</b>
      <img
        className={styles.kakaotalk202506141319546193Icon}
        alt="Profile"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24'%3E%3Cpath fill='%23CCCCCC' d='M12 2a5 5 0 0 1 5 5a5 5 0 1 1-5-5Zm0 12c4.4 0 8 2.7 8 6v2H4v-2c0-3.3 3.6-6 8-6Z'/%3E%3C/svg%3E"
      />
    </div>
  );
};

export default Schedules;
