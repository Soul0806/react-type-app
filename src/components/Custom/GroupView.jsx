const GroupView = (props) => {
    const { filteredSale, groupViewProps } = props;
    return <>
        {Object.keys(filteredSale).map((key, index) => (
            <ul key={index}>
                <li>{key}</li>
                <ul>
                    {filteredSale[key].map((item, index) => (
                        <>
                            <li key={item.id} className="flex g-1">
                                {groupViewProps.props.map((prop, index) => (
                                    <span key={index}>{item[prop]}</span>
                                ))}
                            </li>
                        </>
                    ))}
                </ul>
            </ul>
        )
        )}
    </>;
}

export default GroupView;