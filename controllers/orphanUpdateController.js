const OrphanUpdate = require('../models/orphanUpdateModel');

exports.getAllUpdates = async (req, res) => {
    try {
        const updates = await OrphanUpdate.getAll();
        res.json(updates);
    } catch (error) {
        console.error("❌ Error in getAllUpdates:", error);
        res.status(500).json({ error: 'خطأ في السيرفر' });
    }
};

exports.getUpdatesByOrphan = async (req, res) => {
    try {
        const updates = await OrphanUpdate.getByOrphanId(req.params.id);
        res.json(updates);
    } catch (error) {
        console.error("❌ Error in getUpdatesByOrphan:", error);
        res.status(500).json({ error: 'حدث خطأ أثناء جلب التحديثات' });
    }
};

exports.createUpdate = async (req, res) => {
    try {
        const { orphan_id, update_type, description } = req.body;
        const image_url = req.file ? `/images/${req.file.filename}` : null;

        const insertId = await OrphanUpdate.create({
            orphan_id,
            update_type,
            description,
            image_url,
        });

        res.status(201).json({ id: insertId, message: 'تمت إضافة التحديث بنجاح' });
    } catch (error) {
        console.error("❌ Error in createUpdate:", error);
        res.status(500).json({ error: 'فشل في إضافة التحديث' });
    }
};

exports.updateUpdate = async (req, res) => {
    try {
        const { update_type, description } = req.body;
        const image_url = req.file ? `/images/${req.file.filename}` : null;

        await OrphanUpdate.update(req.params.id, {
            update_type,
            description,
            image_url,
        });

        res.json({ message: 'تم تحديث البيانات بنجاح' });
    } catch (error) {
        console.error("❌ Error in updateUpdate:", error);
        res.status(500).json({ error: 'فشل في التحديث' });
    }
};

exports.deleteUpdate = async (req, res) => {
    try {
        await OrphanUpdate.delete(req.params.id);
        res.json({ message: 'تم حذف التحديث بنجاح' });
    } catch (error) {
        console.error("❌ Error in deleteUpdate:", error);
        res.status(500).json({ error: 'فشل في الحذف' });
    }
};
