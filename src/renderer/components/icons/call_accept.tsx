// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {CSSProperties} from 'react';

type Props = {
    className?: string;
    fill?: string;
    style?: CSSProperties;
}

export default function CallAccept(props: Props) {
    return (
        <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            {...props}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.64559 1.42597C3.39602 1.4736 3.1642 1.58139 2.95996 1.74478C2.79597 1.87596 2.31694 2.36506 2.16369 2.55782C1.84861 2.95407 1.61209 3.43718 1.49785 3.91784C1.4225 4.23481 1.40817 4.36946 1.40893 4.75297C1.40972 5.15514 1.43164 5.32486 1.52764 5.6723C1.64785 6.10741 1.79576 6.402 2.14976 6.9114C3.64874 9.06844 5.42097 10.9751 7.46423 12.629C8.09957 13.1432 9.16507 13.9226 9.4883 14.1095C10.0174 14.4155 10.5471 14.5695 11.1374 14.5892C11.9857 14.6174 12.748 14.3695 13.4321 13.8429C13.6169 13.7007 14.1814 13.145 14.2974 12.9911C14.4097 12.8422 14.4868 12.6872 14.546 12.4913C14.5846 12.3638 14.5897 12.3202 14.591 12.1076C14.5926 11.8463 14.5717 11.7273 14.4879 11.5205C14.3812 11.2573 14.3571 11.2299 13.322 10.1921C12.7887 9.65742 12.302 9.18129 12.2404 9.13408C11.7998 8.79632 11.2031 8.73055 10.7033 8.9646C10.5459 9.03831 10.4702 9.08877 10.2942 9.2376C10.1438 9.36474 10.0514 9.40358 9.90216 9.40241C9.69107 9.40076 9.77584 9.47584 8.14978 7.85007C7.1241 6.82455 6.67285 6.36292 6.64866 6.31437C6.59763 6.21199 6.58272 6.09381 6.60637 5.97917C6.62821 5.87328 6.65709 5.82648 6.8254 5.62434C6.95683 5.46649 7.0796 5.23208 7.13104 5.04076C7.17997 4.85878 7.18042 4.48784 7.1319 4.31096C7.08547 4.14166 7.01318 3.97776 6.92569 3.84347C6.81982 3.68097 4.8976 1.76035 4.73431 1.6539C4.59786 1.56495 4.43275 1.4927 4.26647 1.44915C4.10732 1.40748 3.80221 1.39608 3.64559 1.42597ZM3.72039 2.44502C3.6479 2.47364 3.58713 2.52432 3.3705 2.73695C2.95789 3.1419 2.77619 3.37912 2.62551 3.70951C2.39397 4.21722 2.34283 4.84985 2.49013 5.38451C2.54126 5.57006 2.63967 5.81088 2.72561 5.96062C2.90563 6.27436 3.56567 7.17974 4.09255 7.83568C5.25458 9.28237 6.64229 10.6724 8.11225 11.8623C8.87426 12.4791 9.8848 13.2027 10.1779 13.3415C10.9582 13.711 11.8629 13.6629 12.5842 13.2136C12.7729 13.096 12.8768 13.0079 13.1862 12.7033C13.56 12.3352 13.5845 12.2976 13.5843 12.0916C13.5841 11.9666 13.5785 11.9373 13.5415 11.8678C13.5104 11.8096 13.241 11.5311 12.5496 10.8424C11.6532 9.94966 11.5952 9.89514 11.5077 9.86315C11.3092 9.79054 11.1425 9.83088 10.9534 9.99721C10.7479 10.178 10.5726 10.2783 10.3331 10.3519C10.2039 10.3916 10.17 10.3952 9.92031 10.3956C9.62455 10.396 9.55803 10.3843 9.33711 10.2933C9.05836 10.1784 9.05782 10.1779 7.43855 8.55989C5.80433 6.92691 5.81878 6.9428 5.69989 6.6476C5.61111 6.42712 5.60008 6.36284 5.60117 6.07201C5.60207 5.83249 5.60613 5.79526 5.64532 5.66756C5.7178 5.43138 5.81929 5.25534 6.00673 5.04076C6.16615 4.85826 6.2057 4.68868 6.13431 4.49377C6.10227 4.40634 6.04813 4.34887 5.15575 3.45508C4.47685 2.77511 4.18834 2.49658 4.13023 2.46497C4.01789 2.40386 3.84589 2.3955 3.72039 2.44502Z'
                fill='currentColor'
            />
        </svg>

    );
}
