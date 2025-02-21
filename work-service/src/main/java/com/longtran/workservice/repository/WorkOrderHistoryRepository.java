package com.longtran.workservice.repository;

import com.longtran.workservice.models.entity.WorkOrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkOrderHistoryRepository extends JpaRepository<WorkOrderHistory, Long> {
}
