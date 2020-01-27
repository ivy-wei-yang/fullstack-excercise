import { Observable, of, throwError } from "rxjs";
// import { Observable } from "rxjs/Observable";
import { createNoteEpic } from "../CreateNoteEpic";

import api from "core/apiClient";

it("createNoteEpic: successful request", done => {
    const spy = jest.spyOn(api, "post").mockImplementation(
        () =>
            new Promise(resolve => {
                resolve({
                    data: {},
                    id: "customerId"
                });
            })
    );
    const action$ = of({
        type: "CREATE_NOTE_REQUEST",
        payload: {
            customerId: "customerId",
            data: {}
        }
    });

    // @ts-ignore
    const epic$ = createNoteEpic(action$);

    epic$.subscribe(action => {
        expect(action.type).toBe("CREATE_NOTE_SUCCESS");
        expect(action.payload).toEqual({
            data: {},
            id: "customerId"
        });
        done();
    });

    spy.mockRestore();
});

it("createNoteEpic: failed request", done => {
    const error = new Error("unexpected error");
    const spy = jest.spyOn(api, "post").mockImplementation(
        () =>
            new Promise(() => {
                throw error;
            })
    );

    const action$ = of({
        type: "CREATE_NOTE_REQUEST",
        payload: {
            customerId: "customerId",
            data: {}
        }
    });

    // @ts-ignore
    const epic$ = createNoteEpic(action$);

    epic$.subscribe(action => {
        expect(action.type).toBe("CREATE_NOTE_FAILURE");
        expect(action.payload).toEqual({
            error
        });
        done();
    });

    spy.mockRestore();
});
