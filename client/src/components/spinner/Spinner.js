import React from 'react'
import { Row, Spinner } from 'reactstrap'

export const GrowingSpinner = (
    <>
        <Row className="d-flex justify-content-center m-5">
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="light" />
            <Spinner type="grow" color="dark" />
        </Row>
    </>
)