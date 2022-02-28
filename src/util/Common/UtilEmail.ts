class UtilEmail {
    public static CanValidEmail(email: string): boolean {
        const result = email.match(
            /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return result != undefined && result.length > 0;
    }
}

export default UtilEmail;