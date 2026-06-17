export default async function handler(req, res) {
    // CORS 차단을 방지하기 위해 헤더 허용 세팅
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { path, markets } = req.query;
    
    if (!path) {
        return res.status(400).json({ error: "경로(path)가 지정되지 않았습니다." });
    }

    try {
        // 브라우저가 아닌 버셀 클라우드 IP로 업비트 서버 안전 호출
        const upbitUrl = `https://api.upbit.com/v1/${path}${markets ? '?markets=' + markets : ''}`;
        const response = await fetch(upbitUrl);
        const data = await response.json();
        
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}