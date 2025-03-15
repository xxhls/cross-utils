/** @format ai create by treesea */


class TaishanReport {
	// Private static variable to store the singleton instance
	private static instance: TaishanReport | null = null;
	instanse: any;

	// Private constructor to prevent direct instantiation
	private constructor() {

		// Initialize the SgmMpSDK instance
		this.instanse = window.__sgm__;
	}

	// Static method to get the singleton instance
	static getInstance(): TaishanReport {
		// If the instance is not yet created, create it
		if (TaishanReport.instance === null) {
			TaishanReport.instance = new TaishanReport();
		}
		// Return the instance
		return TaishanReport.instance;
	}

	// Instance methods to call SgmMpSDK methods
	custom({ type, code, msg }, pid?) {
		return this.instanse.custom({ type, code, msg: msg  }, pid);
	}

	error(error: Error, pid) {
		return this.instanse.error(error, pid);
	}

	api({ url, status, code, msg, time, requestLength, requestType }) {
		this.instanse.api({ url, status, code, msg, time, requestLength, requestType });
	}
	userInfo({ uid }) {
		try {
			// console.error('设置用户信息~~', uid);
			this.instanse.userInfo({
				uid: uid, //
			});
		} catch (error) {
			// console.error('Error in TaishanReport.userInfo:', error);
		}
	}
}

// Export the singleton instance
export default TaishanReport.getInstance();

export enum Taishan_Type {
	ERROR = 1,
	WARN = 2,
	INFO = 3,
}
