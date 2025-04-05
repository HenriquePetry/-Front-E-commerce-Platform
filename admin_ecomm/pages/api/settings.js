export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  try {
    if (req.method === 'PUT') {
      const { name, value } = req.body;
      const settingDoc = await Setting.findOne({ name });

      if (settingDoc) {
        settingDoc.value = value;
        await settingDoc.save();
        res.json(settingDoc);
      } else {
        const newSetting = await Setting.create({ name, value });
        res.status(201).json(newSetting); // Retorna o novo documento criado
      }
    } else if (req.method === 'GET') {
      const { name } = req.query;
      const settingDoc = await Setting.findOne({ name });
      if (settingDoc) {
        res.json(settingDoc);
      } else {
        res.status(404).json({ message: 'Setting not found' }); // Retorna 404 se não encontrado
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`); // Método não permitido
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' }); // Erro do servidor
  }
}
