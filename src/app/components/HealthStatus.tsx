import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"

export default function HealthStatus() {
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchHealthStatus = () => {
        setLoading(true);
        fetch('http://localhost:5000/library/healthcheck')
            .then(data => {
                console.log(data.status);
                setStatus(true);
            })
            .catch(err => {
                console.log(err);
                setStatus(false);
            })
            .finally(
                () => setLoading(false)
            )
    }

    useEffect(() => {
        fetchHealthStatus()
        const intervalId = setInterval(() => {
            fetchHealthStatus()
        }, 10000)
        return () => clearInterval(intervalId)
    }, []);

    return <>
        <Row className="align-items-center justify-content-center">
            <Col>
                <div>Status:</div>
            </Col>
            <Col>
                {loading ? (
                    <div className="statusDown"/>
                ) : (
                    <div className={status ? "statusUp" : "statusDown"}/>
                )}
            </Col>
        </Row>
    </>
}