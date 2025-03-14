import Board from '../service/schemas/Board.js';

export const createBoard = async (req, res) => {
  try {
    const { title, icon, background } = req.body;
    const userId = req.user._id;

    const newBoard = await Board.create({ title, icon, background, userId });

    res.status(201).json(newBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBoardsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const boards = await Board.find({ userId });

    res.status(200).json(boards);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, icon, background } = req.body;

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { title, icon, background },
      { new: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }

    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBoard = await Board.findByIdAndDelete(id);

    if (!deletedBoard) {
      return res.status(404).json({ message: 'Board not found' });
    }

    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};