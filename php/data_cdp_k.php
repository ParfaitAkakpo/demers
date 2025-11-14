<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo '
{
    "data_cdp_k": {
        "cdp": [
            0.0206,
            0.0465,
            0.1386
        ],
        "k": [
            0.0364,
            0.0334,
            0.0301
        ]
    }
}
';