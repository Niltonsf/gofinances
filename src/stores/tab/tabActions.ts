export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';

export const setSelectedTabSuccess = (selectedTab: any) => ({
	type: SET_SELECTED_TAB,
	payload: { selectedTab }
});

export function setSelectedTab(selectedTab: any) {
	return dispatch  => {
		dispatch(setSelectedTabSuccess(selectedTab));
	}
}