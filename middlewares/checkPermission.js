module.exports = (requiredPermission) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user || !user.role) {
            return res.status(403).json({ message: 'Access denied. User role missing.' });
        }

        const rolePermissions = {
            admin: ['canViewSponsors', 'canEditSponsors', 'canExportSponsors', 'canManageUsers', 'canApproveSponsorships'],

            sponsor: ['canViewOwnSponsorships','canRequestSponsorship','canEditOwnProfile'],

            donor: ['canViewOwnDonations','canMakeDonation','canEditOwnProfile'],

            volunteer: ['canViewAssignedTasks','canMarkTaskComplete','canEditOwnProfile'],

            orphanages: ['canViewOrphans','canAddOrphan', 'canUpdateOrphan','canSendOrphanUpdates'],

            delivery: ['canViewDeliveryTasks','canUpdateDeliveryStatus','canViewAssignedDeliveries']
        };


        const permissions = rolePermissions[user.role] || [];

        if (!permissions.includes(requiredPermission)) {
            return res.status(403).json({ message: 'Access denied. Permission not granted.' });
        }

        next();
    };
};
