import Table from './Table';
import Filter from './Filter';

const API_URL = 'https://localhost:7123/api/merchandise';


export default function Merchandise() {

    return (
        <>
            <div className="merchandise">
                <Filter />
                <Table />
            </div>
        </>
    );
}