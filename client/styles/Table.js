import Theme from './Theme.js';

export default {
  formWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
    position: 'relative',
  },
  headerBg: {
    width: '100%',
    padding: '14px 0',
    backgroundColor: Theme.DEFAULT_COLOR,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
  },
  frozenHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scrollableListWrapper: {
    padding: '40px 0 0 0',
    width: '100%',
    height: '60vh',
    overflowY: 'scroll',
  },
  headerField: {
    flex: 1,
    fontSize: 15,
    fontWeight: 500,
    color: '#fff',
    padding: '0 2px',
    textAlign: 'center',
  },
  imageField: {
    maxWidth: 120,
  },
  doubleWidth: {
    flex: 2,
  },
  listWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 0px',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listWithInsertCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  li: {
    listStyle: 'none',
    width: '100%',
    borderRadius: 3,
    padding: '6px 0',
    margin: '12px 0',
    display: 'flex',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    padding: '10px 2px',
    fontSize: 14,
    color: Theme.DEFAULT_COLOR,
    textAlign: 'center',
    margin: 'auto',
    wordBreak: 'break-word',
  },
  tableImage: {
    width: 120,
    height: 80,
  },
  tableFunctionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherVersionsWrapper: {
    flex: 2,
    padding: 0,
    display: 'flex',
    wordBreak: 'initial',
  },
};
