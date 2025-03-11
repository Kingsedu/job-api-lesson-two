import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class NotFound extends CustomAPIError{
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export default NotFound;