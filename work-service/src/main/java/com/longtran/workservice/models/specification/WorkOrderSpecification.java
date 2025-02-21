package com.longtran.workservice.models.specification;

import com.longtran.workservice.models.entity.WorkOrder;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Lớp WorkOrderSpecification giúp xây dựng truy vấn động cho thực thể WorkOrder.
 * Sử dụng Specification để tạo điều kiện tìm kiếm linh hoạt dựa trên các tham số đầu vào.
 */
public class WorkOrderSpecification {

    /**
     * Phương thức buildSpecification tạo Specification cho WorkOrder dựa trên các tiêu chí tìm kiếm.
     *
     * @param woCode Mã WorkOrder (tìm kiếm theo chuỗi, có thể chứa một phần mã)
     * @param woContent Nội dung WorkOrder (tìm kiếm theo chuỗi, có thể chứa một phần nội dung)
     * @param woTypeId Loại WorkOrder (tìm kiếm chính xác theo ID)
     * @param priorityId Mức độ ưu tiên (tìm kiếm chính xác theo ID)
     * @param status Trạng thái WorkOrder (tìm kiếm chính xác theo ID)
     * @param startTime Ngày bắt đầu (lớn hơn hoặc bằng giá trị này)
     * @param endTime Ngày kết thúc (nhỏ hơn hoặc bằng giá trị này)
     * @param assignUserId Người được giao công việc (tìm kiếm chính xác theo ID)
     * @return Specification<WorkOrder> dùng để tạo truy vấn động
     */
    public static Specification<WorkOrder> buildSpecification(
            String woCode,
            String woContent,
            Long woTypeId,
            Long priorityId,
            Long status,
            LocalDateTime startTime,
            LocalDateTime endTime,
            Long assignUserId
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>(); // Danh sách điều kiện tìm kiếm

            // Tìm kiếm theo mã WorkOrder (LIKE, không phân biệt hoa thường)
            if (woCode != null && !woCode.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("woCode")),
                        "%" + woCode.toLowerCase() + "%"
                ));
            }

            // Tìm kiếm theo nội dung WorkOrder (LIKE, không phân biệt hoa thường)
            if (woContent != null && !woContent.trim().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("woContent")),
                        "%" + woContent.toLowerCase() + "%"
                ));
            }

            // Tìm kiếm theo loại WorkOrder (ID chính xác)
            if (woTypeId != null) {
                predicates.add(criteriaBuilder.equal(root.get("woTypeId"), woTypeId));
            }

            // Tìm kiếm theo mức độ ưu tiên (ID chính xác)
            if (priorityId != null) {
                predicates.add(criteriaBuilder.equal(root.get("priorityId"), priorityId));
            }

            // Tìm kiếm theo trạng thái WorkOrder (ID chính xác)
            if (status != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            // Lọc theo ngày bắt đầu (lớn hơn hoặc bằng)
            if (startTime != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("startTime"), startTime
                ));
            }

            // Lọc theo ngày kết thúc (nhỏ hơn hoặc bằng)
            if (endTime != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("endTime"), endTime
                ));
            }

            // Lọc theo người được giao công việc (ID chính xác)
            if (assignUserId != null) {
                predicates.add(criteriaBuilder.equal(root.get("assignUserId"), assignUserId));
            }

            // Trả về một Specification với các điều kiện AND
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
